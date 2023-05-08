import { Gallery } from '../../../components/Gallery';
import './styles.scss';

export function Presentation() {
    return (
        <section id="about-me" className="presentation">
            <h2 className="title">Hi, How R U?</h2>
            
            <div className="presentation-container">
                <article>
                <p>My name is <span className='highlight'>Julio Negri Mirandola</span>, I'm 22 years old and I live in Brazil.</p>
                <p>Today I'm working as a <span className='highlight'>Front-End and Mobile Developer</span> using ReactJS and React Native.</p>
                <p>On my free time I like to play some games on my Nintendo Switch and read some books about Operating Systems (and do some Rust code).</p>
                </article>
        
                <div className="skills-presentation">
                    Future Cool Component
                </div>
            </div>
        </section>
    );
}