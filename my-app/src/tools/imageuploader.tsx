export const uploadDocuments = async (files:any, setDisplayedImage:any, shownImages:any = null, setIsLoading:any = null) => {

    const filePromises = files.map((file:any) => {
      // Return a promise per file
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            // Resolve the promise with the response value
            resolve(reader.result);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    // Wait for all promises to be resolved
    await Promise.all(filePromises).then((values) => {
        setDisplayedImage(values);
    })

  };