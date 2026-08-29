import { marked } from "marked"
import sanitizeHtml from 'sanitize-html';
import TurndownService  from 'turndown'
export const santize = async (markdown: string):Promise<string> => {
    if (!markdown || typeof (markdown) != "string") {
        return ""
    }
    // sanatize it properly
    try {
        // first convert into html and then sanatize it 
        const convertedHtml =await marked.parse(markdown)
        // sanatize(remove those html that you dont want)
        // Allow only a super restricted set of tags and attributes
        const clean = sanitizeHtml(convertedHtml, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img" ,"pre" , "code"]),
            allowedAttributes: {...sanitizeHtml.defaults.allowedAttributes,
                "img":["src" ,"alt" , "title"],
                "pre":["class"],
                "code":["class"],
                "a":["href" , "target"]
            },
            allowedIframeHostnames: ['www.youtube.com'],
            allowedSchemes:["http" ,"https"],
            allowedSchemesByTag:{
                "img":["http" , "https"]
            }
        });
        const tds= new TurndownService();
        return tds.turndown(clean)
    } catch (error) {
          throw new Error(`Something went  wrong while parsing the markdown file. +${error}`);

    }

}