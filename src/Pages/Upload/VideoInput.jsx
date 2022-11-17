import React, { useState, useEffect } from "react";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  const [src, setSrc] = useState([])

  useEffect(() => {
    setSrc([...src, source])
  }, [source]);
  console.log(src);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    console.log(event.target.files);
  };
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const srcVideoHref = src.filter(i => i !== undefined ? i : null)
  console.log(srcVideoHref);

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {src.filter(i => i !== undefined ? i : null) && (
        srcVideoHref?.map(srcVideo => {
          return <video
            className="VideoInput_video"
            width="100%"
            height={height}
            controls
            src={srcVideo}
          />
        })

      )}
      <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
    </div>
  );
}
