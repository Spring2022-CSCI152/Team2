# for loading/processing the images  
from keras.preprocessing.image import load_img 
from keras.preprocessing.image import img_to_array 
from keras.applications.vgg16 import preprocess_input 

# models 
from keras.applications.vgg16 import VGG16 
from keras.models import Model

# clustering and dimension reduction
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

# for everything else
import os
import sys
import numpy as np
import matplotlib.pyplot as plt
from random import randint
import pandas as pd
import pickle
from PIL import Image
import requests

if __name__ == '__main__':

    # get image urls from argv
    if len(sys.argv) != 2:
        print('Usage: python clusterImagesURL.py <image_urls>')
        sys.exit(1)

    # get image urls from argv
    image_urls = sys.argv[1]

    # remove brackets
    image_urls = image_urls.replace('[', '')
    image_urls = image_urls.replace(']', '')

    # load the image files from the image urls
    images = []
    for url in image_urls.split(','):
        try:
            img = Image.open(requests.get(url, stream=True).raw)
            img = img.resize((224, 224))
            img = img.convert('RGB')
            img = np.array(img)
            images.append(img)
        except:
            print('Failed to download image: %s' % url)
                
    model = VGG16()
    model = Model(inputs = model.inputs, outputs = model.layers[-2].output)

    def extract_features(img, model):
        # reshape the data for the model reshape(num_of_samples, dim 1, dim 2, channels)
        reshaped_img = img.reshape(1,224,224,3) 
        # prepare image for model
        imgx = preprocess_input(reshaped_img)
        # get the feature vector
        features = model.predict(imgx, use_multiprocessing=True)
        return features
    
    data = {}
    p = r'C:\Users\johne\Desktop\Repos\Team2\backend\python\features.pkl'

    # lop through each image in the dataset
    for image in images:
        # try to extract the features and update the dictionary
        try:
            feat = extract_features(image,model)
            data[image] = feat
        # if something fails, save the extracted features as a pickle file (optional)
        except:
            with open(p,'wb') as file:
                pickle.dump(data,file)
            
    
    # get a list of the filenames
    filenames = np.array(list(data.keys()))

    # get a list of just the features
    feat = np.array(list(data.values()))

    # reshape so that there are 210 samples of 4096 vectors
    feat = feat.reshape(-1,4096)

    # get the unique labels (from the image_labels.csv)
    # df = pd.read_csv('image_labels.csv')
    # label = df['label'].tolist()
    # unique_labels = list(set(label))
    k = 5
    unique_labels = ["c" + str(x) for x in range(0,k)]

    # reduce the amount of dimensions in the feature vector
    pca = PCA(n_components=3, random_state=22)
    pca.fit(feat)
    x = pca.transform(feat)

    # this is just incase you want to see which value for k might be the best 
    sse = []
    start = 2
    list_k = list(range(start, len(unique_labels)+1))

    for k in list_k:
        km = KMeans(n_clusters=k, random_state=22, n_jobs=-1)
        km.fit(x)
        
        sse.append(km.inertia_)

    # get best k value
    k = sse.index(min(sse)) + start
    # print(k)

    # cluster the data
    kmeans = KMeans(n_clusters=k, random_state=22, n_jobs=-1)
    kmeans.fit(x)

    # save the clusters
    groups = {}
    for file, cluster in zip(filenames,kmeans.labels_):
        if cluster not in groups.keys():
            groups[cluster] = []
            groups[cluster].append(file)
        else:
            groups[cluster].append(file)

    # convert group keys to c + number
    groups = {'c' + str(x): groups[x] for x in groups.keys()}

    # print the clusters
    print(groups)
    sys.stdout.flush()