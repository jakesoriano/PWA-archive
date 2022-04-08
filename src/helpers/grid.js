import * as GridComponents from '_components/grid';
import { ComponentLoader } from '_components/core';
import { replaceUrlPlaceholders } from '_helpers';

function renderContent(page, data, parent) {
  try {
    if (data !== undefined && data.component !== undefined) {
      const Compo = GridComponents[data.component] || null;
      if (Compo !== undefined) {
        const props = {
          ...data.props,
          page,
          parent,
        };
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Compo {...props} />;
      }
    }
    return null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Widget Component >> renderContent >> Error:', err);
    return null;
  }
}

function generateStyles(parentSelector, styles) {
  try {
    // construct CSS rules from config
    let css = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const item of styles) {
      css = `${css}${parentSelector} ${item.selector}{${replaceUrlPlaceholders(
        item.styles
      )}}\n`;
    }
    return css;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Page Styling >> error:', err);
    return '';
  }
}

// eslint-disable-next-line import/prefer-default-export
export function renderGrid(page, parentClass, data) {
  return (
    <div id="page-widgets">
      {data.contents.map((item, i) => {
        return (
          <ComponentLoader
            disabledLazyLoad={item.disabledLazyLoad}
            id={item.id || `w${i + 1}`}
            className={
              item.horizontal
                ? `scroll-x widget widget${i + 1}`
                : `widget widget${i + 1}`
            }
          >
            {/* Content */}
            {renderContent(page, item, parentClass)}
            {/* Style */}
            <style type="text/css">
              {generateStyles(
								`#page-${parentClass.toLowerCase()} .widget${i + 1}`,
								item.styles ? item.styles : []
              )}
            </style>
          </ComponentLoader>
        );
      })}
      {/* Global Styles */}
      <style type="text/css">
        {generateStyles(
					`#page-${page ? page.toLowerCase() : ''}`,
					data.styles ? data.styles : []
        )}
      </style>
    </div>
  );
}
