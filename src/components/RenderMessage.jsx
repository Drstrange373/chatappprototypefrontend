/* eslint-disable react/prop-types */
export default function RenderMessage({ role, content, urlToImage} ) {

    if (urlToImage) {
        return <div>
            <strong className="message">{role}:</strong>
            <img src={urlToImage} alt="uploaded_image" />
        </div>

    }
    return (

        <div>
            <strong className="message">{role}:</strong>
            <span>{content}</span>
        </div>

    )
}
