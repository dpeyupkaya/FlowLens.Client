import { GlobalOutlined } from '@ant-design/icons';
import { Select, Tooltip } from 'antd';
import { useLanguage } from '../../i18n/LanguageProvider';

const LanguageSelector = ({ compact = false }) => {
  const { language, setLanguage, labels } = useLanguage();
  return (
    <div data-language-control>
      <Tooltip title={labels.language}>
        <Select
          aria-label={labels.language}
          value={language}
          onChange={setLanguage}
          size="small"
          className={compact ? 'w-[86px]' : 'w-[110px]'}
          suffixIcon={<GlobalOutlined />}
          options={[
            { value: 'tr', label: 'TR' },
            { value: 'en', label: 'EN' }
          ]}
        />
      </Tooltip>
    </div>
  );
};

export default LanguageSelector;
