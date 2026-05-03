import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, Link, useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        // Check if we're on the home page (with or without language prefix)
        const isHomePage = location.pathname === '/' || location.pathname.match(/^\/[a-z]{2}\/?$/);
        
        if (!isHomePage) {
            // Navigate to home with hash and scroll after navigation
            const currentLang = location.pathname.match(/^\/([a-z]{2})/)?.[1] || 'en';
            navigate(`/${currentLang}#${sectionId}`);
            return;
        }

        // If already on home page, scroll immediately
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    const navItems = [
        {key: 'about', id: 'about', isExternal: false},
        {key: 'skills', id: 'skills', isExternal: false},
        {key: 'projects', id: 'projects', isExternal: false},
        {key: 'experience', id: 'experience', isExternal: false},
        {key: 'videos', id: 'videos', isExternal: false},
        {key: 'contact', id: 'contact', isExternal: false},
        {key: 'resume', id: '/resume', isExternal: true}
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-background/80 backdrop-blur-xl shadow-card border-b border-border/50'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/lovable-uploads/016ddcf3-b80d-4f9b-a0f5-55d3e4992b2c.png"
                            alt="Egor Zheludkov Logo"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="text-xl font-bold text-foreground">{t('header.name')}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            item.isExternal ? (
                                <Link
                                    key={item.key}
                                    to={item.id}
                                    className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
                                >
                                    {t(`header.nav.${item.key}`)}
                                </Link>
                            ) : (
                                <button
                                    key={item.key}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
                                >
                                    {t(`header.nav.${item.key}`)}
                                </button>
                            )
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <LanguageSwitcher/>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav
                        className="md:hidden mt-4 pb-4 border-t border-border pt-4 bg-background/95 backdrop-blur-xl shadow-card rounded-lg -mx-4 px-4">
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                item.isExternal ? (
                                    <Link
                                        key={item.key}
                                        to={item.id}
                                        className="text-left text-foreground/80 hover:text-primary transition-colors duration-200 font-medium py-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t(`header.nav.${item.key}`)}
                                    </Link>
                                ) : (
                                    <button
                                        key={item.key}
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-left text-foreground/80 hover:text-primary transition-colors duration-200 font-medium py-2"
                                    >
                                        {t(`header.nav.${item.key}`)}
                                    </button>
                                )
                            ))}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
