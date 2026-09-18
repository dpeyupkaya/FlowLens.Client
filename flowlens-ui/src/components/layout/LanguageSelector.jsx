import { GlobalOutlined } from '@ant-design/icons';
import { Select, Tooltip } from 'antd';
import { useTranslation } from '../../i18n/LanguageProvider';

const LanguageSelector = ({ compact = false }) => {
  const { t, i18n } = useTranslation();
  return (
    <div data-language-control>
      <Tooltip title={t('language')}>
        <Select
          aria-label={t('language')}
          value={i18n.language}
          onChange={i18n.changeLanguage}
          size="small"
          className={compact ? 'w-[86px]' : 'w-[110px]'}
          suffixIcon={<GlobalOutlined />}
          options={[
            { value: 'tr', label: 'TR 🇹🇷' },
            { value: 'en', label: 'EN 🇬🇧' }
          ]}
        />
      </Tooltip>
    </div>
  );
};

export default LanguageSelector;
