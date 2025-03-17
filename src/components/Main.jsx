import { useState, useEffect } from "react";
const Main = () => {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imgUrl: "http://i.imgflip.com/1bij.jpg"

    });

    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes));
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[randomNumber].url;
        setMeme({...meme, imgUrl: newMemeUrl });
    }


    const handleChange = (event) => {
        const {value, name} = event.currentTarget;
        setMeme({...meme, [name]: value})
    }
    return (
    <main>
        <div className="form">
        <label>Top Text
            <input 
                type="text" 
                name="topText" 
                placeholder="One does not simply" 
                onChange={handleChange}
                value={meme.topText}/>
        </label>
        <label>Bottom Text
            <input 
            type="text" 
            name="bottomText" 
            placeholder="Walk into Mordor"
            onChange={handleChange}
            value={meme.bottomText} />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
        </div>
        <div className="meme">
        <img src={meme.imgUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
        </div>
    </main>
    )
    }

export default Main
