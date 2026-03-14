export type Locale = 'pt' | 'en'

const translations = {
  pt: {
    nav: {
      skills: 'Skills',
      projects: 'Projetos',
      books: 'Leituras',
      contact: 'Contato',
    },
    header: {
      role: 'Desenvolvedor Full Stack',
      roles: [
        'Desenvolvedor Full Stack',
        'Desenvolvedor Frontend',
        'Engenheiro Backend',
        'Python Enthusiast',
        'DevOps Programmer',
      ],
      bio: 'Construo produtos digitais com foco em performance, escalabilidade e experiência do usuário. Apaixonado por código limpo e arquiteturas bem pensadas.',
      cv: 'Currículo',
      coverLetter: 'Carta de Apresentação',
      hire: 'Contratar',
      cvFile: '/cv-pt.pdf',
      coverLetterFile: '/cover-letter-pt.pdf',
      available: 'Disponível para projetos',
    },
    sections: {
      skills: 'Habilidades',
      projects: 'Projetos',
      books: 'Leituras',
    },
    footer: {
      madeWith: 'Feito com',
      by: 'por',
      contact: 'Entre em contato',
    },
  },
  en: {
    nav: {
      skills: 'Skills',
      projects: 'Projects',
      books: 'Reading',
      contact: 'Contact',
    },
    header: {
      role: 'Full Stack Developer',
      roles: [
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Engineer',
        'Python Enthusiast',
        'DevOps Programmer',
      ],
      bio: 'I build digital products focused on performance, scalability and user experience. Passionate about clean code and well-thought-out architectures.',
      cv: 'Resume',
      coverLetter: 'Cover Letter',
      hire: 'Hire me',
      cvFile: '/cv-en.pdf',
      coverLetterFile: '/cover-letter-en.pdf',
      available: 'Available for projects',
    },
    sections: {
      skills: 'Skills',
      projects: 'Projects',
      books: 'Reading',
    },
    footer: {
      madeWith: 'Made with',
      by: 'by',
      contact: 'Get in touch',
    },
  },
}

export const useI18n = () => {
  const locale = useState<Locale>('locale', () => 'pt')

  const t = computed(() => translations[locale.value])

  const toggle = () => {
    locale.value = locale.value === 'pt' ? 'en' : 'pt'
    if (process.client) {
      localStorage.setItem('locale', locale.value)
      document.documentElement.setAttribute('lang', locale.value)
    }
  }

  const init = () => {
    if (process.client) {
      const saved = localStorage.getItem('locale') as Locale | null
      if (saved && (saved === 'pt' || saved === 'en')) {
        locale.value = saved
      }
      document.documentElement.setAttribute('lang', locale.value)
    }
  }

  return { locale, t, toggle, init }
}
