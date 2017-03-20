import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import styles from '../css/components/film';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Page = ({ title, link, meta, children }) => {
  return (
    <div className={cx('page')}>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
  meta: PropTypes.array
};

export default Page;
