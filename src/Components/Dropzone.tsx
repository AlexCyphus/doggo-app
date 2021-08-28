import React, {useCallback, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

interface IDropzone {
  text?: String
  onDropFunction: (files: File[]) => void
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  padding: '20px 26px',
  borderWidth: 2,
  borderRadius: 15,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#444444',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Dropzone: React.FC<IDropzone> = ({text, onDropFunction}) => {

  const onDrop = useCallback(onDropFunction, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{text ? text : "Drag 'n' drop some files here, or click to select files"}</p>
      </div>
    </div>
  );
}

export default Dropzone