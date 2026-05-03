import { useTranslation } from 'react-i18next';

const Videos = () => {
  const { t } = useTranslation();

  return (
    <section id="videos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('videos.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('videos.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-card-hover border border-border">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/95l-KzxW9tM"
              title="Development Video by Egor Zheludkov"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
