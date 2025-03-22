import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import BrushIcon from '@mui/icons-material/Brush';
import ImageIcon from '@mui/icons-material/Image';
import Artist from '../pages/Artist';
import Cover from '../pages/Cover';
import Author from '../pages/Author';
import Book from '../pages/Book';
import DocFXIframe from '../pages/Site/DocFXIframe';
import DocumentationIcon from '../icons/DocumentationIcon';

const pages = {
    home: {
        icon: <HomeIcon />,
        text: "Home",
        body: <>Welcome to the homepage!</>
    },
    books: {
        icon: <BookIcon />,
        text: "Books",
        body: <Book />
    },
    authors: {
        icon: <PersonIcon />,
        text: "Authors",
        body: <Author />
    },
    covers: {
        icon: <ImageIcon />,
        text: "Covers",
        body: <Cover />
    },
    artists: {
        icon: <BrushIcon />,
        text: "Artists",
        body: <Artist />
    },
    documentation: {
        icon: <DocumentationIcon />,
        text: "Documentation",
        body: <DocFXIframe />
    }
};

export default pages;
