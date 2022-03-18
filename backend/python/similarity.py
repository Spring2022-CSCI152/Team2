import os
import sys
# python image similarity library
from skimage.metrics import structural_similarity as ssim
import numpy as np
import matplotlib as mpl
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
        sys.exit(1)
    image1 = sys.argv[1]
    image2 = sys.argv[2]
    # check that the files exist
    if not os.path.isfile(image1):
        print("Error: image1 does not exist")
        sys.exit(1)
    if not os.path.isfile(image2):
        print("Error: image2 does not exist")
        sys.exit(1)

    # load images using cv2
    img1 = cv2.imread(image1)
    img2 = cv2.imread(image2)
    # convert to greyscale
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    # map to same dimensions
    img1 = cv2.resize(img1, (img2.shape[1], img2.shape[0]))

    # call similarity function
    sim = similarity(img1, img2)
    print("Similarity:", sim)
    return sim

if __name__ == '__main__':
    main()