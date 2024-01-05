import { useState } from "react"


export default function NewPostPage() {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4000/newpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ caption, image })
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }



    return(
        <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Add Your Post</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="caption" className="block text-gray-600 text-sm font-bold">Caption</label>
            <input
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="image" className="block text-gray-600 text-sm font-bold">Image</label>
            <input
                type="file"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
            Submit
        </button>
    </form>
</div>

    )

    }