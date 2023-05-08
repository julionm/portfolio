import { Header } from '../../components/Header';
import { PersonalInfo } from '../../components/PersonalInfo';
import { Presentation } from '../../components/Presentation';
import './styles.scss';

export function HomePage() {
    return (
        <main>
            <div className='container'>
                <Header />
                <PersonalInfo />
                <Presentation />
            </div>
        </main>
    )
}