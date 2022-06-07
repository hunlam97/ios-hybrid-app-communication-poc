import "./styles.css";
import { useEffect, useState, useCallback } from "react";

const mediaStyle = {
  maxWidth: 320
}

const buttonStyle = {
  fontSize: 16,
  padding: 12
}

const labelStyle = {
  fontSize: 8
}

const containerStyle = {
  margin: 8
}

const RefreshableStuff = () => {
  const [person, setPerson] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const getPerson = useCallback(async () => {
    setLoading(true);
    const res = await fetch("https://randomuser.me/api/");
    const person = await res.json();
    setPerson(person.results[0]);
    setLoading(false);
  }, []);

  useEffect(() => {
    getPerson();
    Object.assign(window, { reloadContent: getPerson });
  }, [getPerson]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p>
        {person.name?.title}.{person.name?.first} {person.name?.last}
      </p>
      <p>{person.email}</p>
    </div>
  );
};

const ImgStuff = () => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    Object.assign(window, {
      setImgUrl: (path: string) => {
        console.log({ path });
        setSrc(path);
      }
    });
  }, []);

  return src ? (
    <>
      <img
        style={mediaStyle}
        alt="img"
        src={src}
      />
      <br />
      <label
        style={labelStyle}
      >
        {src}
      </label>
    </>
  ) : (
    <button
      style={buttonStyle}
      onClick={() => {
        const webkit: any = window['webkit']
        webkit?.messageHandlers?.observer?.postMessage({
          action: "loadImage"
        });
      }}
    >
      Load image
    </button>
  );
};

const VideoStuff = () => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    Object.assign(window, {
      setVideoUrl: (path: string) => {
        console.log({ path });
        setSrc(path);
      }
    });
  }, []);

  return src ? (
    <>
      <video
        controls
        loop
        autoPlay
        style={mediaStyle}
      >
        <source src={src} type="video/mp4" />
      </video>
      <br />
      <label
        style={labelStyle}
      >
        {src}
      </label>
    </>
  ) : (
    <button
      style={buttonStyle}
      onClick={() => {
        const webkit: any = window['webkit']
        webkit?.messageHandlers?.observer?.postMessage({
          action: "loadVideo"
        });
      }}
    >
      Load video
    </button>
  );
};

export default function App() {
  return (
    <div className="App">
      <RefreshableStuff />
      <div
        style={containerStyle}
      >
        <ImgStuff />
      </div>
      <div style={containerStyle}>
        <VideoStuff />
      </div>
    </div>
  );
}
