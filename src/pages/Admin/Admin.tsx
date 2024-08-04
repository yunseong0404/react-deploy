import { useEffect, useState } from 'react';

import { BASE_URL } from '@/api/instance';

export const Admin = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/admin/products`)
      .then((response) => response.text())
      .then((html) => setHtmlContent(html));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
