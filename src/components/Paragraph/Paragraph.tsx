
interface Paragraph {
    text: string;
    className?: string;
}
const Paragraph: React.FC<Paragraph> = ({ text, className = "" }) => {
    return (
        <p className={`${className} avenir`} dangerouslySetInnerHTML={{ __html: text}}></p>
    )
}

export default Paragraph