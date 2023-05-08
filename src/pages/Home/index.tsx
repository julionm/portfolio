import { Separator } from '../../components/Separator';
import { Header } from '../Sections/Header';
import { PersonalInfo } from '../Sections/PersonalInfo';
import { PersonalProjects } from '../Sections/PersonalProjects';
import { Presentation } from '../Sections/Presentation';
import './styles.scss';

export function HomePage() {
    return (
        <main>
            <div className='container'>
                <Header />
                <PersonalInfo />
                <Presentation />
                <Separator />
                <PersonalProjects />
            </div>
        </main>
    )
}