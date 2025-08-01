import imgHeader from '../assets/file-text.svg';
import TitleHeader from './TitleHeader';

export default function Header() {
  return (
    <header className="bg-white flex py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl  flex items-center gap-4">
        <img
          src={imgHeader}
          alt="Harkowe company logo"
          className="w-9 h-9"
        />
        <h1 className="text-2xl sm:text-3xl font-bold">
          <span className="text-green-800">Har</span>
          <span className="text-gray-600">kowe</span>
        </h1>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <TitleHeader />
      </div>
        
    </header>
  );
}
