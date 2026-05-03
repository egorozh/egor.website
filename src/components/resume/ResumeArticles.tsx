
import { useTranslation } from 'react-i18next';

interface ArticleItem {
  year: string;
  title: string;
  link: string;
}

const ResumeArticles = () => {
  const { t } = useTranslation();
  const articleItems = t('resume.articles.items', { returnObjects: true }) as ArticleItem[];

  return (
    <section className="mb-8 print:mb-6">
      <h3 className="text-xl font-bold text-foreground mb-4 border-b-2 border-primary pb-1 print:text-lg print:border-gray-300">
        {t('resume.articles.title')}
      </h3>
      <div className="space-y-4 print:space-y-3">
        {articleItems.map((article, index) => (
          <div key={index} className="border-l-4 border-primary/30 pl-4 print:border-gray-300 print:pl-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-lg font-semibold text-foreground print:text-base">{article.title}</h4>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary underline text-sm print:text-foreground/90 print:no-underline print:text-xs"
                >
                  {article.link}
                </a>
              </div>
              <div className="text-muted-foreground text-sm md:text-right print:text-xs">
                <p>{article.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeArticles;
