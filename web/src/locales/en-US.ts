import menu from './en-US/menu';
import settingDrawer from './en-US/settingDrawer';
import dashboard from "./en-US/dashboard";
import ai from "./en-US/ai";

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Produced by Ant Financial Experience Department',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  'app.welcome': 'Welcome to XinAdmin',
  ...menu,
  ...settingDrawer,
  ...dashboard,
  ...ai
};
