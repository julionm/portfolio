import './styles.scss';

export function PersonalInfo() {
    return (
        <section className="personal-info">
        <div className="picture-container">
            <img src="src/assets/me.jpeg" alt="Photo of Julio Negri" />   
        </div>
        <div className="personal-info-text">
            <span className="title">Julio Negri</span>
            <span className="my-occupation">Front-End and Mobile Developer</span>
        </div>
        </section>
    );
}