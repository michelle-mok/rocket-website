import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import GetStartedButton from "../components/GetStartedButton";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Layout from "../components/Layout";
import '../styles/main.scss';
import HomepageSuccessSection from "../components/homepage/HomepageSuccessSection";
import HomepageCoursesSection from "../components/homepage/HomepageCoursesSection";
import HomepageCurriculumSection from "../components/homepage/HomepageCurriculumSection";
import HomepageFormerStudentsSection from "../components/homepage/HomepageFormerStudentsSection";
import StartCodingSection from "../components/StartCodingSection";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  title,
  header,
  success, 
  courses,
  upcomingCourseDates,
  curriculum,
  formerstudents
}) => {

  return (
    <>
    <div className="container homepage-header-container">
      <div className="row homepage-header-row">
          <div className="col-12 col-md-6 order-2 order-md-1 homepage-header-col-left">
              <h2 className="homepage-header-heading">
              {header.heading}
              </h2>
              <p className="homepage-header-subheading">
              {header.subheading}
              </p>
              <div className="hompage-header-button-container">
              <GetStartedButton />
              </div>
              <h6 className="homepage-header-companies-heading">OUR HIRING PARTNERS</h6>
              <div className="homepage-header-companies-container">
              <div className="homepage-header-individual-company">
                  <StaticImage src="../../static/img/homepage/govtech-color-logo.png" alt="govtech logo" />
              </div>
              <div className="homepage-header-individual-company">
                <a href="https://www.99.co/team/" target="_blank" rel="noopener noreferrer">
                  <StaticImage 
                    src='../../static/img/homepage/ninetynineco-color-logo.png' alt="ninetynineco logo" 
                    placeholder="blurred"
                  />
                </a>
              </div>
              <div className="homepage-header-individual-company">
                  <StaticImage 
                    src='../../static/img/homepage/glints-color-logo.png' alt="glints logo" 
                    placeholder="blurred"
                    />
              </div>
              <div className="homepage-header-individual-company">
                  <StaticImage 
                    src='../../static/img/about-page/about-carousell-icon.png' alt="carousell logo" 
                    placeholder="blurred"
                    />
              </div>
              <div className="homepage-header-individual-company">
                  <StaticImage 
                    src='../../static/img/about-page/about-stashaway-icon.png' alt="stashaway logo" 
                    placeholder="blurred"
                    />
              </div>
              <div className="homepage-header-individual-company">
                  <StaticImage 
                    src='../../static/img/homepage/xfers-straitsx-logo.jpeg' alt="xfers-straitsx logo" 
                    placeholder="blurred"
                    />
              </div>
              </div>
          </div> 
          <div className="col-12 col-md-6 order-1 order-md-2 homepage-header-col-right">
              <div className="homepage-header-col-right-img">
                  <PreviewCompatibleImage imageInfo={header.headerimage} />
              </div>
          </div>
      </div>
    </div>
    <HomepageSuccessSection 
      success={success} 
    />
    <HomepageCoursesSection 
      courses={courses} 
      upcomingCourseDates={upcomingCourseDates}
    />
    <HomepageCurriculumSection curriculum={curriculum} />
    <HomepageFormerStudentsSection formerstudents={formerstudents} />
    <StartCodingSection upcomingCourseDates={upcomingCourseDates} />
    </>

  );
};

IndexPageTemplate.propTypes = { 
  title: PropTypes.string,
  header: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    headerimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  success: PropTypes.shape({
    heading: PropTypes.string,
    blurbs: PropTypes.array,
  }),
  courses: PropTypes.shape({
    heading: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    details: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => { 
  const { frontmatter } = data.markdownRemark;
 
   // from rocket's gcal events
  const { edges } = data.allCalendarEvent;

  const today = new Date().toISOString();

  const upcomingCourseDates = edges
      .filter(event => event.node.start.dateTime > today);


  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        header={frontmatter.header}
        success={frontmatter.success}
        courses={frontmatter.courses}
        upcomingCourseDates={upcomingCourseDates}
        curriculum={frontmatter.curriculum}
        formerstudents={frontmatter.formerstudents}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    allCalendarEvent: PropTypes.shape({
      node: PropTypes.array,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplateQuery {
    file {
      id
    }
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        header {
          heading
          subheading
          headerimage {
            alt
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 660)
              }
            }
          }
        }
        success {
          heading
          blurbs {
            text
            heading
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
        }
        courses {
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
          details {
            conditions
            currentprice
            duration
            heading
            prevprice
            subheading
            type
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
          heading
        }
        curriculum {
          heading
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
          instructors {
            experience
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, height: 200, width: 200)
              }
            }
            position
            name
          }
          smalltext
          subheading
        }
        formerstudents {
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
          position
          studentname
          testimonial
        }
      }
    }
    allCalendarEvent {
      edges {
        node {
          description
          summary
          end {
              dateTime
              date
          }
          start {
              dateTime
              date
          }
        }
      }
    }
  }
`;
