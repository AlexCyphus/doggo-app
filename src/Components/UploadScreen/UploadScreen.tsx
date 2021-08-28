import axios from "axios";
import { useState } from "react"
import Dropzone from '../Dropzone';
import "./UploadScreen.scss"

const UploadScreen: React.FC = () => {
    const [uploadedFile, setUploadedFile] = useState<null | File>(null)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [dogName, setDogName] = useState<string>('')
    const [submissionStatus, setSubmissionStatus] = useState<"success" | "failure" | "Uploading..." | null>(null)

    // validate file and display an image preview
    const handleDroppedFile = (files: File[]) => {
      // reset uploaded file and image preview
      removeFile()
      
      const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      // if more than one file uploaded throw an error
      if (files.length > 1){ setErrorMessage("Please only upload one photo") }

      // else if the file is an unsupported format throw an error
      else if (!acceptedImageTypes.includes(files[0].type)) { setErrorMessage("Please only submit gifs, jpgs, or pngs") }
    
      // else read and show a preview of the file
      else { 
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === 'string' && setImagePreview(reader.result);
        reader.readAsDataURL(files[0]);
        setUploadedFile(files[0]) 
      }
    }

    // post file information and display the submission status
    const submitFile = async () => {
      setSubmissionStatus("Uploading...")
      const ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

      const toBase64 = (file: File) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      if (uploadedFile){
        let filePayload = {
          File: await toBase64(uploadedFile),
          Filename: uploadedFile.name
          // we would probably also pass the dog's name here
        }
        
        let response;

        // make sure file is uploaded successfully otherwise throw an error
        try {
          response = await axios.post(ENDPOINT, filePayload);
          if (response.status === 201){ setSubmissionStatus("success") }
        } catch(err) {
          setSubmissionStatus("failure")
        }
      }
    }

    // restart the file selection process
    const removeFile = () => {
      setUploadedFile(null)
      setImagePreview('')
      setErrorMessage('')
      setSubmissionStatus(null)
    }

    // update the dogs name
    const updateDogName = (e: React.FormEvent<HTMLInputElement>) => {
      setSubmissionStatus(null)
      setDogName(e.currentTarget.value)
    }

    return (
      <div className="UploadScreen">
        <div className="UploadScreen-inner">
          <h1 className="UploadScreen-title">👋 Welcome to www.cutedogofthemonth.co.uk 🐕</h1>
          <div className="UploadScreen-dogOfTheMonth">
            <h2>Last month's dog of the month</h2>
            <img 
              src="https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop" 
              alt="a fluffy dog wearing a medical mask" 
              className="UploadScreen-dogOfTheMonth-image"
            />
            <p className="UploadScreen-dogOfTheMonth-name">Fredrick the Anxious</p>
          </div>
          <div className="UploadScreen-newSubmission">
            <h2>Think your dog is cuter?</h2>
            <p>Submit an image to be considered for the next dog of the month!</p>
            
            {/* if no successfully previewed image show the dropzone and potentially error messages */}
            {!imagePreview && <>
              <div className="UploadScreen-newSubmission-dropzoneContainer">
                <Dropzone 
                  text={"Upload your fav picture of your dog 🐶"}
                  onDropFunction={handleDroppedFile}
                />
              </div>
              {errorMessage 
                ? <p className="UploadScreen-newSubmission-errorMessage">{errorMessage}</p>
                : <p>Please only submit gifs, jpgs, or pngs</p>
              }
            </>
            }

            {/* if available image to preview show preview + remove photo button + possible submission messages*/}
            {imagePreview && 
            <>
              <div className="UploadScreen-newSubmission-image">
                <div className="UploadScreen-newSubmission-image-inner">
                  <img src={imagePreview} alt="your dog" className="UploadScreen-newSubmission-image-image"/>
                  {submissionStatus !== "success" && <p className="UploadScreen-newSubmission-image-close" onClick={removeFile}>
                    <span className="UploadScreen-newSubmission-image-close-icon">❌</span>
                    Remove photo
                    </p>
                  }
                </div>
              </div>

              {/* if file not yet submitted ask for the dog's name */}
              {submissionStatus !== "success" && <div className="UploadScreen-newSubmission-name">
                <p>Cute 🥰</p>
                <input 
                  type="text" 
                  name="dog-name" 
                  id="UploadScreen-newSubmission-name-input" 
                  placeholder="What's their name? (optional)"
                  value={dogName}
                  onChange={updateDogName}
                />
              </div>
              }
            </>
            }
            
            {/* if the photo isn't submitted yet give the option to upload it */}
            {submissionStatus !== "success" && <button disabled={!uploadedFile} onClick={submitFile} className="UploadScreen-newSubmission-submitButton">SUBMIT</button>}
            <p className="disclaimer">* Disclaimer: Any photos submitted become the full intellectual property of Cute Doggo LLC</p>
            
            {/* display the status of the photo upload */}
            {submissionStatus === "success"
              ? <p className="UploadScreen-newSubmission-submissionStatus">{dogName ? `${dogName}'s pic was successfully submitted!` : "Picture successfully submitted!"}</p>
              : submissionStatus === "failure"
                ? <p className="UploadScreen-newSubmission-submissionStatus">Oops! Something went wrong. Please try again</p>
                : <p className="UploadScreen-newSubmission-submissionStatus">{submissionStatus}</p>
            }
          </div>
        </div>
      </div>
  )
}

export default UploadScreen