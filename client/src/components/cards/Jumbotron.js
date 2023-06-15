export default function Jumbotron({
    title,
    subTitle = "Welcome to React E-commerce",
}) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col text-center p-5 bg-light">
                    <h1>{title}</h1>
                    <p className="lead">{subTitle}</p>
                </div>
            </div>
        </div>
    );
}
