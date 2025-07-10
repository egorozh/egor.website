import React, {useState} from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Globe} from 'lucide-react';
import {useLanguageWithI18n} from '@/hooks/useLanguageWithI18n';
import {Language} from "@/i18n";

const languages = [
    {code: 'en', name: 'English', flag: '🇺🇸'},
    {code: 'ru', name: 'Русский', flag: '🇷🇺'}
];

const LanguageSwitcher = () => {
    const {currentLanguage, setLanguage} = useLanguageWithI18n();

    const [isOpen, setIsOpen] = useState(false);

    const getCurrentFlag = () => {
        return languages.find(lang => lang.code === currentLanguage)?.flag || '🌐';
    };

    const handleLanguageChange = (langCode: string) => {
        let lang: Language = "en";

        switch (langCode) {
            case 'en':
                lang = "en"
                break;
            case 'ru':
                lang = "ru"
                break;
        }

        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 px-3 hover:bg-ovdix-beige/20"
                >
                    <Globe size={16}/>
                    <span>{getCurrentFlag()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[150px]">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center gap-2 cursor-pointer ${
                            currentLanguage === lang.code ? 'bg-ovdix-beige/30' : ''
                        }`}
                    >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;
