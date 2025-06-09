type FilePreviewProps = {
    image: string
}

export default function FilePreview({ image }: FilePreviewProps) {
    const preview = () => {
        const file = 'image'
        if (file === 'image') {
            return <div
                className="bg-no-repeat bg-cover bg-center w-full h-full"
                style={{
                    backgroundImage: `url(${image})`
                }}
            ></div>;
        }
    }


    return <div className="w-full h-full ">
        {preview()}
    </div>;
}
