
import { useTranslation } from 'react-i18next';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

const ResumeHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8 border-b pb-6 print:border-b-2 print:border-gray-300">
      <h1 className="text-4xl font-bold text-foreground mb-2 print:text-3xl">{t('hero.name')}</h1>
      <h2 className="text-xl text-primary font-semibold mb-4 print:text-lg print:text-foreground/90">{t('resume.header.title')}</h2>
      
      <div className="flex flex-wrap justify-center gap-6 text-muted-foreground print:gap-4 print:text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{t('resume.header.location')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>egorozh.dev@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          <span>github.com/egorozh</span>
        </div>
        <div className="flex items-center gap-2">
          <Linkedin className="h-4 w-4" />
          <span>linkedin.com/in/egorozh</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;
