import imgHeader from '../assets/file-text.svg';
import TitleHeader from './TitleHeader';

export default function Header({ title, setTitle }) {
  return (
    <header className="bg-white flex flex-col sm:flex-row py-4 px-6 sticky top-0 z-50">
      {/* Mobile Layout (stacked) */}
      <div className="flex flex-col sm:hidden space-y-3 w-full">
        {/* Logo and company name centered */}
        <div className="flex items-center justify-center gap-4">
          <img
            src={imgHeader}
            alt="Harkowe company logo"
            className="w-9 h-9"
          />
          <h1 className="text-2xl font-bold">
            <span className="text-green-800">Har</span>
            <span className="text-gray-600">kowe</span>
          </h1>
        </div>
        
        {/* Title header centered */}
        <div className="flex justify-center">
          <TitleHeader title={title} setTitle={setTitle}/>
        </div>
      </div>

      {/* Desktop Layout (original design) */}
      <div className="hidden sm:flex w-full relative">
        <div className="max-w-6xl flex items-center gap-4">
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
          <TitleHeader title={title} setTitle={setTitle}/>
        </div>
      </div>
    </header>
  );
}