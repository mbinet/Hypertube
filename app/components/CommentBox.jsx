import React from 'react';
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
addLocaleData([...en, ...fr]);

/**
 * A counter button: tap the button to increase the count.
 */
class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            query_term: "",
        };
    }

    render() {
        return (
            <IntlProvider locale='fr' messages={fr1} >
                <div> BONJOUR JE SUIS UNE DIV </div>
            </IntlProvider>
        );
    }
}
export default CommentBox;
