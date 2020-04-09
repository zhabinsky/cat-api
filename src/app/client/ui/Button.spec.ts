/**
 * https://www.robinwieruch.de/react-testing-mocha-chai-enzyme-sinon
 * Here I checked how component tests are written:
 *
 * NextJS specific instructions:
 * https://github.com/zeit/next.js/blob/canary/examples/with-mocha
 */

/* global describe, it */
import { shallow } from 'enzyme';
import React from 'react';
import expect from 'expect.js';

import Button from './Button';

describe('Component Test: ui/Button', () => {
    const testString = 'oer2304u29489u52934590348y52845892345234592h345';
    it('passes children props', () => {
        const app = shallow(React.createElement(Button, null, testString));
        const appHTML = app.html();
        expect(appHTML.indexOf(testString)).to.not.equal(-1);
    });
    it('appends props.className to className', () => {
        const app = shallow(
            React.createElement(Button, { className: testString }, null),
        );
        const appHTML = app.html();
        expect(appHTML.indexOf(testString)).to.not.equal(-1);
    });
});
