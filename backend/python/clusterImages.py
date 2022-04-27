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

path = r'C:\Users\john\Desktop\Repos\Team2\backend\python\dataset'
path = r'C:\Users\johne\Desktop\Repos\Team2\backend\python\dataset'
# change the working directory to the path where the images are located
os.chdir(path)

# this list holds all the image filename
images = []

# creates a ScandirIterator aliased as files
with os.scandir(path) as files:
  # loops through each file in the directory
    for file in files:
        if file.name.endswith('.png') or file.name.endswith('.jpg'):
          # adds only the image files to the images list
            images.append(file.name)
            
            
model = VGG16()
model = Model(inputs = model.inputs, outputs = model.layers[-2].output)

def extract_features(file, model):
    # load the image as a 224x224 array
    img = load_img(file, target_size=(224,224))
    # convert from 'PIL.Image.Image' to numpy array
    img = np.array(img) 
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

# cluster feature vectors
kmeans = KMeans(n_clusters=len(unique_labels),n_jobs=-1, random_state=22)
kmeans.fit(x)

# holds the cluster id and the images { id: [images] }
groups = {}
for file, cluster in zip(filenames,kmeans.labels_):
    if cluster not in groups.keys():
        groups[cluster] = []
        groups[cluster].append(file)
    else:
        groups[cluster].append(file)

# function that lets you view a cluster (based on identifier)        
def view_cluster(cluster):
    plt.figure(figsize = (5,5))
    # gets the list of filenames for a cluster
    files = groups[cluster]
    # only allow up to 30 images to be shown at a time
    if len(files) > 30:
        print(f"Clipping cluster size from {len(files)} to 30")
        files = files[:29]
    # plot each image in the cluster
    for index, file in enumerate(files):
        plt.subplot(5,5,index+1)
        img = load_img(file)
        img = np.array(img)
        plt.imshow(img)
        plt.axis('off')

# view all clusters
# for cluster in groups.keys():
#     view_cluster(cluster)
# plt.show()
        
   
# this is just incase you want to see which value for k might be the best 
sse = []
start = 2
list_k = list(range(start, len(unique_labels)+1))

for k in list_k:
    km = KMeans(n_clusters=k, random_state=22, n_jobs=-1)
    km.fit(x)
    
    sse.append(km.inertia_)

# # Plot sse against k
# plt.figure(figsize=(6, 6))
# plt.plot(list_k, sse)
# plt.xlabel('Number of clusters *k*')
# plt.ylabel('Sum of squared distance')
# plt.show()

# get best k value
k = sse.index(min(sse)) + start
# print(k)

# cluster the data
kmeans = KMeans(n_clusters=k, random_state=22, n_jobs=-1)
kmeans.fit(x)

# view all clusters
# for cluster in groups.keys():
#     view_cluster(cluster)
# plt.show()

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