import pytest
import sys

# import similarity.py from parent directory
sys.path.append('..')
from similarity import *

def test_prepare_images_with_invalid_path():
    image1 = 'InvalidPath'
    image2 = 'test_images/patrick2.jpg'

    with pytest.raises(SystemExit):
        prepare_images(image1, image2)

def test_grab_image_with_invalid_path():
    image = 'InvalidPath'

    with pytest.raises(SystemExit):
        grab_image(image)

def test_grab_image_with_wrong_file_type():
    image = 'test_images/wrong_type.txt'

    with pytest.raises(SystemExit):
        grab_image(image)

def test_greyscale_image():
    image1 = 'test_images/patrick.jpg'
    img1 = grab_image(image1)
    
    assert img1.shape == (166, 303, 3)
    assert img1.dtype == 'uint8'
    assert img1.ndim == 3

def test_image_resize():
    image1 = 'test_images/patrick.jpg'
    img1 = grab_image(image1)
    img1 = resize_image(img1, 100, 100)
    assert img1.shape == (100, 100, 3)

def test_black_and_white_image_close_to_zero():
    image1 = 'test_images/black.jpg'
    image2 = 'test_images/white.jpg'
    img1, img2 = prepare_images(image1, image2)

    assert abs(similarity(img1, img2) - 0.0) < 0.05

def test_different_image_between_zero_and_one():
    image1 = 'test_images/patrick.jpg'
    image2 = 'test_images/patrick2.jpg'
    img1, img2 = prepare_images(image1, image2)

    assert similarity(img1, img2) >= 0.0 and similarity(img1, img2) <= 1.0

def test_same_image_equals_one():
    image1 = 'test_images/patrick.jpg'
    image2 = 'test_images/patrick.jpg'
    img1, img2 = prepare_images(image1, image2)
    img1 = resize_image(img1, img2.shape[1], img2.shape[0])

def test_similarity_with_invalid_image():
    image1 = 'test_images/patrick.jpg'
    image2 = 'test_images/patrick2.jpg'
    img1 = grab_image(image1)
    img2 = grab_image(image2)
    img1 = convert_greyscale(img1)
    img2 = convert_greyscale(img2)
    # don't resize
    
    with pytest.raises(ValueError):
        similarity(img1, img2)