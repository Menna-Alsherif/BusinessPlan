import Accordion from "react-bootstrap/Accordion";

const AccordionComponent = (props) => {
  // function that switches on FAQ type and returns suitable jsx element
  const accordion_body = (faq) => {
    switch (faq.answer_type) {
      // p is for answers to be in paragraphs
      case "Paragraph":
        return <p className="lead">{faq.answer}</p>;
      // H is for answers to be in headings
      case "Header":
        const header_options = (
          <div className="m-2">
            <ul class="list-group list-styled">
              {faq.answer.map((answer) => {
                return (
                  <li key={answer.priority} class="lead">
                    {answer}
                  </li>
                );
              })}
            </ul>
          </div>
        );
        return header_options;
      // bp is for answers to be in bullet points
      case "Bullet Points":
        const bullet_points_options = (
          <ol class="list-group list-group-numbered m-2">
            {faq.answer.map((answer, index) => {
              return (
                <>
                  <li key={index} className="list-group-item lead">
                    {answer.header}
                  </li>
                  <br />
                  <ul class="list-group list-styled">
                    {answer.bullet_points.map((bullet_point, index) => {
                      return (
                        <li key={index} className="lead">
                          {bullet_point}
                        </li>
                      );
                    })}
                  </ul>
                  <hr />
                </>
              );
            })}
          </ol>
        );
        return bullet_points_options;
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <Accordion className="mb-2 " defaultActiveKey="1">
        <Accordion.Item className="border-0" eventKey={props.priority}>
          <Accordion.Header className="m-1">{props.faq.question}</Accordion.Header>
          <Accordion.Body>{accordion_body(props.faq)}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />
    </div>
  );
};

export default AccordionComponent;
