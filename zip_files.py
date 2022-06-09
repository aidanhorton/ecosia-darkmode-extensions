__author__ = 'OppnedKatt'
__version__ = 1.2

import os
import shutil
import zipfile
import traceback


def get_all_filedirectories(src_dir: str) -> list:
    """Gets the paths of all the files inside a folder

    Args:
        src_dir (str): The path to the directory with the files

    Returns:
        list: List of filepaths
    """
    # Creates an empty list for filepaths to the files that are to be zipped
    filepaths = []
    
    # Walks through every file in the folder that is to be zipped, and adds their paths to a list
    for (dirpath, dirnames, filenames) in os.walk(src_dir):
        for filename in filenames:
            filepath = os.path.join(dirpath.replace(src_dir, '').replace(os.path.join('Q', 'Q').replace('Q', ''), '', 1), filename)
            filepaths.append(filepath)
        
    # Returns the list of filepaths to the files that are to be zipped
    return filepaths


def create_zip(name: str, filepaths: list, original_dir: str) -> None:
    """Zips for a desired browser

    Args:
        name (str): Name of the browser
        filepaths (list): The list of all paths to the files that are to be zipped
        original_dir (str): The path to the directory at the start of the program
    """
    current_path = os.getcwd()
    
    # Changes up the filenames and the filepaths in the filepath-lookup variable
    if name != 'Chrome':
        os.rename('manifest.json', 'manifest - Chrome.json')
        os.rename(f'manifest - {name}.json', 'manifest.json')
        filepaths.remove(f'manifest - {name}.json')
        filepaths.append('manifest - Chrome.json')
    
    # Makes the zip
    with zipfile.ZipFile(f'{name}.zip', 'w') as zip:
        for file in filepaths:
            zip.write(file)
    os.chdir(original_dir)
    os.replace(os.path.join('temp', f'{name}.zip'), os.path.join('Latest Builds', f'{name}.zip'))
    
    print(f'Successfully zipped "{name}.zip"')
    os.chdir(current_path)
    
    # Reverts changes
    if name != 'Chrome':
        os.rename('manifest.json', f'manifest - {name}.json')
        os.rename('manifest - Chrome.json', 'manifest.json')
        filepaths.remove('manifest - Chrome.json')
        filepaths.append(f'manifest - {name}.json')


def main(src_dir: str, original_dir: str) -> None:
    """Zips the desired files

    Args:
        src_dir (str): The path of the directory with the files that should be zipped
        original_dir (str): The path of src_dir's parent-directory
    """
    try:
        # Gets the paths to all the files in the folder that is to be zipped
        filepaths = get_all_filedirectories(src_dir)
        
        # Makes a temporary folder for renameing the manifests
        if os.path.exists('temp'):
            shutil.rmtree('temp')
        shutil.copytree(src_dir, 'temp')
        os.chdir('temp')
        
        # Zips for the different browsers
        create_zip('Chrome', filepaths, original_dir)
        create_zip('FireFox', filepaths, original_dir)
        create_zip('Edge', filepaths, original_dir)
        

    except:
        # Prints out the error-message
        traceback.print_exc()
        
    finally:
        # Removes the temporary folder
        os.chdir(original_dir)
        if os.path.exists('temp'):
            shutil.rmtree('temp')


# Checks if the program is being run as the main program, and is not being imported
if __name__ == '__main__':
    src_dir = 'Chrome & FireFox'  # The folder that is to be zipped
    original_dir = os.getcwd()  # Stores the original directory
    main(src_dir, original_dir)
