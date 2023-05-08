import './styles.scss';

export function Header() {
    return (
        <header className="header-container">
            <span className="section-links" ><a href="#about-me">About Me</a></span>
            <span className="section-links" ><a href="#my-projects">My Projects</a></span>
            <span className="section-links" ><a href="#skills">Skills</a></span>
            <span className="section-links" ><a href="#contact-me">Contact Me</a></span>
        </header>
    )
}