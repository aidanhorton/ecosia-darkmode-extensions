__author__ = 'OppnedKatt'
__version__ = 1.0

import os
import shutil
import zipfile
import traceback


# A function which gets the paths of all the files inside of the folder that is to be zipped
def get_all_filedirectories(src_dir: str) -> list:
    # Creates an empty list for filepaths to the files that are to be zipped
    filepaths = []
    
    # Walks through every file in the folder that is to be zipped, and adds their paths to a list
    for (dirpath, dirnames, filenames) in os.walk(src_dir):
        for filename in filenames:
            filepath = os.path.join(dirpath.replace(src_dir, '').replace(os.path.join('Q', 'Q').replace('Q', ''), '', 1), filename)
            filepaths.append(filepath)
            
            print(filepath)
        
    # Returns the list of filepaths to the files that are to be zipped
    return filepaths


# The main funtion that runs the program
def main(src_dir: str, original_dir: str) -> None:
    try:
        # Gets the paths to all the files in the folder that is to be zipped
        filepaths = get_all_filedirectories(src_dir)
        
        # Changes the current directory to be inside the folder that is to be zipped
        os.chdir(src_dir)
        
        # Makes the zip for Chrome
        with zipfile.ZipFile('Chrome.zip', 'w') as zip:
            for file in filepaths:
                zip.write(file)
        os.chdir(original_dir)
        os.replace(os.path.join(src_dir, 'Chrome.zip'), os.path.join('Latest Builds', 'Chrome.zip'))
        print('\nSuccessfully zipped "Chrome.zip"')
        
        # Makes a temporary folder for renameing the manifests
        if os.path.exists('temp'):
            shutil.rmtree('temp')
        shutil.copytree(src_dir, 'temp')
        os.chdir('temp')
        
        # Changes up the filenames and the filepaths in the filepath-lookup variable to be fit for Firefox
        os.rename('manifest.json', 'manifest - Chrome.json')
        os.rename('manifest - FireFox.json', 'manifest.json')
        filepaths.remove('manifest - FireFox.json')
        filepaths.append('manifest - Chrome.json')
        
        # Makes the zip for Firefox
        with zipfile.ZipFile('FireFox.zip', 'w') as zip:
            for file in filepaths:
                zip.write(file)
        os.chdir(original_dir)
        os.replace(os.path.join('temp', 'FireFox.zip'), os.path.join('Latest Builds', 'FireFox.zip'))
        print('Successfully zipped "FireFox.zip"')

    except:
        # Changes the directory back to the original directory if the program runs into an error
        os.chdir(original_dir)
        
        # Prints out the traceback as the try & except blocks stopped it from being printed
        traceback.print_exc()
        
    finally:
        # Removes the temporary folder if the zipping is finished, or if the zipping ended prematurely
        if os.path.exists('temp'):
            shutil.rmtree('temp')


# Checks if the program is being run as the main program, and is not being imported
if __name__ == "__main__":
    src_dir = 'Chrome & FireFox' # The folder that is to be zipped
    original_dir = os.getcwd() # Stores the original directory
    main(src_dir, original_dir)
