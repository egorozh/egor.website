import {useTranslation} from 'react-i18next';

const Footer = () => {
    const {t} = useTranslation();

    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <img
                            src="/lovable-uploads/016ddcf3-b80d-4f9b-a0f5-55d3e4992b2c.png"
                            alt="Egor Zheludkov Logo"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="text-lg font-semibold">{t('footer.name')}</span>
                    </div>
                    <p className="text-gray-400 text-center">
                        {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
