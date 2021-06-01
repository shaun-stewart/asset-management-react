import splitAddress from './splitAddress'

/** Recursively reduces value down from an object or array until a scalar value is found.
 * Once found, the scalar value and key are then passed to the add method.
 * @param key
 * @param value
 * @param add
 */
const buildParams = (key, value, add) => {
  var name, i, l;
  var bracketRegEx = /\[\]$/;
  if (value instanceof Array) {
    for (i = 0, l = value.length; i < l; i++) {
      // if key ends with empty brackets, add to pair. otherwise
      if (bracketRegEx.test(key)) {
        add(key, value[i]);
      } else {
        buildParams(key + "[" + ( typeof value[i] === "object" ? i : "" ) + "]", value[i], add);
      }
    }
  } else if (typeof value === "object") {
    // Serialize object item.
    for (name in value) {
      if (value.hasOwnProperty(name)) {
        buildParams(key + "[" + name + "]", value[name], add);
      }
    }
  } else {
    // Serialize scalar item.
    add(key, value);
  }
}


  // summary:
  //		This module defines query string processing functions.

  /**
   // summary:
   //        takes a name/value mapping object and returns a string representing
   //        a URL-encoded version of that object.
   // example:
   //        this object:
   //
   //    |    {
            //	|		blah: "blah",
            //	|		multi: [
            //	|			"thud",
            //	|			"thonk"
            //	|		]
            //	|	};
   //
   //        yields the following query string:
   //
   //    |    "blah=blah&multi=thud&multi=thonk"

   * @param a
   * @returns {string|*}
   */
  export const objectToQuery = (obj) => {

    var key, name;
    var pairs = [];

    var add = function (key, value) {
      if(value !== null && value !== undefined){
        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }
    };
    if (obj instanceof Array) {
      for (name in obj) {
        if (obj.hasOwnProperty(name)) {
          add(name, obj[name]);
        }
      }
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          buildParams(key, obj[key], add);
        }
      }
    }
    return pairs.join("&").replace(/%20/g, "+");
  }

  /**
   * Method took from dojo/io-query
   * @param str
   * @returns {{}}
   */
  export const queryToObject = (/*String*/ str) => {
    // summary:
    //		Create an object representing a de-serialized query section of a
    //		URL. Query keys with multiple values are returned in an array.
    //
    // example:
    //		This string:
    //
    //	|		"foo=bar&foo=baz&thinger=%20spaces%20=blah&zonk=blarg&"
    //
    //		results in this object structure:
    //
    //	|		{
    //	|			foo: [ "bar", "baz" ],
    //	|			thinger: " spaces =blah",
    //	|			zonk: "blarg"
    //	|		}
    //
    //		Note that spaces and other urlencoded entities are correctly
    //		handled.

    var dec = decodeURIComponent, qp = str.split("&"), ret = {}, name, val;
    for (var i = 0, l = qp.length, item; i < l; ++i) {
      item = qp[i];
      if (item.length) {
        var s = item.indexOf("=");
        if (s < 0) {
          name = dec(item);
          val = "";
        } else {
          name = dec(item.slice(0, s));
          val = dec(item.slice(s + 1));
        }
        if (typeof ret[name] === "string") { // inline'd type check
          ret[name] = [ret[name]];
        }

        if (Array.isArray(ret[name])) {
          ret[name].push(val);
        } else {
          ret[name] = val;
        }
      }
    }
    return ret; // Object
  }



export default objectToQuery;