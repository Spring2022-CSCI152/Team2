import os
import sys
# python image similarity library
from skimage.metrics import structural_similarity as ssim
from skimage import io
import numpy as np
import urllib.request
import urllib.parse
import requests
import matplotlib as mpl
from PIL import Image
import cv2

def similarity(image1, image2):
    # calculate the structural similarity index (SSIM) between two images
    # using the default parameters
    s = ssim(image1, image2)
    # return the result
    return s

def main():
    # pull two image file paths from the command line
    if len(sys.argv) != 3:
        print("Usage: python3 similarity.py <image1> <image2>")
        # py clusterImagesURL.py ['https://notforthieves.s3.us-west-1.amazonaws.com/myImage-1649983183000.jpg','https://notforthieves.s3.us-west-1.amazonaws.com/myImage-1650489958184.png']
        sys.exit(1)
    image1 = sys.argv[1]
    image2 = sys.argv[2]

    # strip
    #image1 = image1.strip('\'')
    #image2 = image2.strip('\'')

    # read images from url
    image1 = Image.open(requests.get(image1, stream=True).raw)
    image2 = Image.open(requests.get(image2, stream=True).raw)

    # convert to numpy array
    image1 = np.array(image1)
    image2 = np.array(image2)

    # convert to greyscale
    img1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
    # map to same dimensions
    img1 = cv2.resize(img1, (img2.shape[1], img2.shape[0]))

    # call similarity function
    sim = similarity(img1, img2)
    return sim

if __name__ == '__main__':
    sim = main()
    print(sim)
    sys.stdout.flush()