import Loader from "react-loader-spinner";
import "./FullscreenLoader.scss"

const FullscreenLoader: React.FC = () => {
    return (
        <div className="FullscreenLoader">
            <div className="FullscreenLoader-inner">
                <Loader
                type="RevolvingDot"
                color="lightblue"
                height={150}
                width={100}
                />
                <h2>🐶 Loading the dog of the month 🐶</h2>
            </div>
        </div>
    )
}

export default FullscreenLoader