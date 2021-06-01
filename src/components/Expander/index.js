import React, {useState} from "react";
import { Segment, Icon } from '@orchard/react-components'



const Expander = props => {
  const { content, children } = props;

  const [expanded, setExpanded] = useState(false)

  const onExpand = () => {
    setExpanded(!expanded);
  };



  const Chevron = (
    <Icon className="chevron" name={`chevron-${expanded ? "up" : "down"}`} />
  );


    return (
      <div className="expander">
        <div
          tabIndex={0}
          onClick={onExpand}
          role="button"
          aria-pressed={expanded}
          className="header"
        >
          <div className="ui grid">
            <div className="fourteen wide column">
              {content}
            </div>
            <div className="two wide column">
              {Chevron}
            </div>
          </div>

        </div>
        {expanded ? children : null}
      </div>
    );

}


export default Expander;


