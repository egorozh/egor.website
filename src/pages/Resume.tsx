
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import Header from '@/components/Header';
import ResumeHeader from '@/components/resume/ResumeHeader';
import ResumeSummary from '@/components/resume/ResumeSummary';
import ResumeSkills from '@/components/resume/ResumeSkills';
import ResumeExperience from '@/components/resume/ResumeExperience';
import ResumeEducation from '@/components/resume/ResumeEducation';
import ResumeArticles from '@/components/resume/ResumeArticles';
import ResumeProjects from '@/components/resume/ResumeProjects';
import ResumeLanguages from '@/components/resume/ResumeLanguages';
import '@/i18n';

const Resume = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('hero.name')} - ${t('resume.title')}`;
  }, [t]);

  useEffect(() => {
    // Reset scroll position to top when navigating to resume page
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadPDF = () => {
    // Generate PDF from page content
    const printContent = document.getElementById('resume-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;
      
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Shared Header - hidden in print */}
      <div className="print:hidden">
        <Header />
      </div>

      <div className="min-h-screen bg-gray-50 py-8 pt-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header with Download PDF - hidden in print */}
          <div className="flex justify-between items-center mb-8 print:hidden">
            <h1 className="text-3xl font-bold text-gray-900">{t('resume.title')}</h1>
            <Button
              onClick={handleDownloadPDF}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('resume.downloadPdf')}
            </Button>
          </div>

          <div id="resume-content">
            <Card className="bg-white shadow-lg print:shadow-none print:border-none">
              <CardContent className="p-8">
                <ResumeHeader />
                <ResumeSummary />
                <ResumeSkills />
                <ResumeExperience />
                <ResumeEducation />
                <ResumeArticles />
                <ResumeProjects />
                <ResumeLanguages />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Print Styles */}
      <style>{`
        @media print {
          body { 
            background: white !important; 
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden { 
            display: none !important; 
          }
          .print\\:shadow-none { 
            box-shadow: none !important; 
          }
          .print\\:border-none { 
            border: none !important; 
          }
          .print\\:text-3xl { 
            font-size: 1.875rem !important; 
          }
          .print\\:text-lg { 
            font-size: 1.125rem !important; 
          }
          .print\\:text-base { 
            font-size: 1rem !important; 
          }
          .print\\:text-sm { 
            font-size: 0.875rem !important; 
          }
          .print\\:text-xs { 
            font-size: 0.75rem !important; 
          }
          .print\\:text-gray-700 { 
            color: rgb(55 65 81) !important; 
          }
          .print\\:text-gray-600 { 
            color: rgb(75 85 99) !important; 
          }
          .print\\:border-gray-300 { 
            border-color: rgb(209 213 219) !important; 
          }
          .print\\:border-b-2 { 
            border-bottom-width: 2px !important; 
          }
          .print\\:mb-6 { 
            margin-bottom: 1.5rem !important; 
          }
          .print\\:mb-1 { 
            margin-bottom: 0.25rem !important; 
          }
          .print\\:gap-4 { 
            gap: 1rem !important; 
          }
          .print\\:gap-2 { 
            gap: 0.5rem !important; 
          }
          .print\\:gap-1 { 
            gap: 0.25rem !important; 
          }
          .print\\:space-y-4 > * + * { 
            margin-top: 1rem !important; 
          }
          .print\\:space-y-3 > * + * { 
            margin-top: 0.75rem !important; 
          }
          .print\\:space-y-0 > * + * { 
            margin-top: 0 !important; 
          }
          .print\\:px-2 { 
            padding-left: 0.5rem !important; 
            padding-right: 0.5rem !important; 
          }
          .print\\:py-0 { 
            padding-top: 0 !important; 
            padding-bottom: 0 !important; 
          }
          .print\\:pl-3 { 
            padding-left: 0.75rem !important; 
          }
          .print\\:bg-transparent { 
            background-color: transparent !important; 
          }
          .print\\:border { 
            border-width: 1px !important; 
          }
          .print\\:no-underline { 
            text-decoration: none !important; 
          }
          .bg-gray-50 { 
            background: white !important; 
          }
          @page {
            margin: 1in;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
