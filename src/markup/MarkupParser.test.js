import { MarkupParser } from "./MarkupParser.js";

let IteroParser = MarkupParser;

test('Parses escaped punctuation', () => {
    // \! \" \# \$ \% \& \' \( \) \* \+ \, \- \. \/ \: \; \< \= \> \? \@ \[ \\ \] \^ \_ \` \{ \| \} \~
    const input = "\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\\\\\]\\^\\_\\`\\{\\|\\}\\~";
    expect(IteroParser.Text.tryParse(input)).toBe("!&quot;#$%&amp;'()*+,-./:;&lt;=&gt;?@[\\]^_`{|}~");
});

test('Parses alphanumeric', () => {
    const input = "hatait5Lahn4mee";
    expect(IteroParser.Text.tryParse(input)).toBe("hatait5Lahn4mee");
});

test('Parses quotes', () => {
    const input = "hello, \"world\"";
    expect(IteroParser.Text.tryParse(input)).toBe("hello, &quot;world&quot;");
});

test('Parses &', () => {
    const input = "R&B fan";
    expect(IteroParser.Text.tryParse(input)).toBe("R&amp;B fan");
});

test('Parses <', () => {
    const input = "I <3 u"
    expect(IteroParser.Text.tryParse(input)).toBe("I &lt;3 u");
});

test('Parses >', () => {
    const input = "2 + 2 > 5"
    expect(IteroParser.Text.tryParse(input)).toBe("2 + 2 &gt; 5");
});



// leading whitespace after opening ** delimiter
// Example 378 from CommonMark 0.29 spec
test('Parses ** foo bar**', () => {
    const input = "** foo bar**"
    expect(IteroParser.Text.tryParse(input)).toBe("** foo bar**");
});


test('Parses **<content>** from beginning', () => {
    const input = "**foo bar**"
    let result = IteroParser.Value.parse(input);
    console.log(result);
    expect(IteroParser.Text.tryParse(input)).toBe("<strong>foo bar</strong>");
});

// Example 380 from CommonMark 0.29 spec
test('Parses foo**bar**', () => {
    const input = "foo**bar**"
    let result = IteroParser.Value.parse(input);
    console.log(result);
    expect(IteroParser.Text.tryParse(input)).toBe("foo<strong>bar</strong>");
});


test('Parses a definition', () => {
    const input = "a **group** is a monoid where every element has an inverse"
    expect(IteroParser.Text.tryParse(input)).toBe("a <strong>group</strong> is a monoid where every element has an inverse");
});


test('Parses a link', () => {
    const input = "you cannot escape from [google](www.google.com). google is all."
    expect(IteroParser.Text.tryParse(input)).toBe("you cannot escape from <a href=\"www.google.com\">google</a>. google is all.");
});

test('Parses a bolded link', () => {
    const input = "**my [example](www.example.com)**";
    expect(IteroParser.Text.tryParse(input)).toBe("<strong>my <a href=\"www.example.com\">example</a></strong>");
});

test('Parses a linked bold text', () => {
    const input = "my [**example**](www.example.com)";
    expect(IteroParser.Text.tryParse(input)).toBe("my <a href=\"www.example.com\"><strong>example</strong></a>");
});