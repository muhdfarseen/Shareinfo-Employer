import React, { useState, useEffect } from 'react';
import { Title, Input, Card, Textarea, SimpleGrid, Button, Group, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconSquareRoundedCheck } from '@tabler/icons-react';
import axiosInstance from "../../Helpers/axios";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const SALARY_TYPE = [
  { value: 'Fixed', label: 'Fixed' },
  { value: 'Onwards', label: 'Onwards' },
  { value: 'Range', label: 'Range' },
];

const WORK_MODE = [
  { value: 'Full Time', label: 'Full Time' },
  { value: 'Part Time', label: 'Part Time' },
  { value: 'Internship', label: 'Internship' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'Trainee', label: 'Trainee' },
  { value: 'Freelance', label: 'Freelance' },
];

const JOB_LEVEL = [
  { value: 'Fresher', label: 'Fresher' },
  { value: 'Experienced', label: 'Experienced' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Others', label: 'Others' },
];

const JOB_PREFERENCE = [
  { value: 'On-site', label: 'On-site' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
];

const JOB_CATEGORY = [
  { value: 'None', label: 'None' },
  { value: 'Software Developer and Designer', label: 'Software Developer and Designer' },
  { value: 'Accounting and Finance', label: 'Accounting and Finance' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Content Writing and Documentation', label: 'Content Writing and Documentation' },
  { value: 'Management', label: 'Management' },
  { value: 'Media/Design/Creatives', label: 'Media/Design/Creatives' },
  { value: 'Architecture and Engineering', label: 'Architecture and Engineering' },
];

const EDUCATIONAL_QUALIFICATION = [
  { value: 'Post Secondary', label: 'Post Secondary' },
  { value: 'Bachelors', label: 'Bachelors' },
  { value: 'Masters', label: 'Masters' },
  { value: 'Research', label: 'Research' },
  { value: 'Professional', label: 'Professional' },
];

const EXPERIENCE_TYPE = [
  { value: 'Experienced', label: 'Experienced' },
  { value: 'Fresher', label: 'Fresher' },
];

const jobSchema = Yup.object().shape({
  job_title: Yup.string().required('Required'),
  job_description: Yup.string().required('Required'),
  min_qualification: Yup.string().required('Required'),
  job_level: Yup.string(),
  working_mode: Yup.string(),
  preference: Yup.string(),
  perks_benefits: Yup.string().required('Required'),
  salary_type: Yup.string(),
  minimum_salary: Yup.number().positive().integer(),
  maximum_salary: Yup.number().positive().integer(),
  job_category: Yup.string(),
  experience_type: Yup.string(),
  minimum_experience: Yup.number().positive().integer(),
  educational_qualification: Yup.string().required('Required'),
  reference_website: Yup.string().required('Required'),
  no_of_vacancies: Yup.number().positive().integer().required('Required'),
  required_skills: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  recruitment_end_date: Yup.date().required('Required').nullable(),
});

export const NewJob = () => {
  const [domainList, setDomainList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDomainList = async () => {
      const accessToken = localStorage.getItem('access_token');

      try {
        const response = await axiosInstance.get('https://dev.shareinfo.io/candidate/domain-list/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDomainList(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDomainList();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
  
      const formattedDate = values.recruitment_end_date instanceof Date
        ? values.recruitment_end_date.toISOString().slice(0, 10)
        : values.recruitment_end_date;
  
      const minQualifications = values.min_qualification.split(',').reduce((acc, curr, index) => {
        acc[index + 1] = curr.trim();
        return acc;
      }, {});
  
      const perksBenefits = values.perks_benefits.split(',').reduce((acc, curr, index) => {
        acc[index + 1] = curr.trim();
        return acc;
      }, {});
  
      const requiredSkills = values.required_skills.split(',').reduce((acc, curr, index) => {
        acc[index + 1] = curr.trim();
        return acc;
      }, {});
  
      const location = values.location.split(',').reduce((acc, curr, index) => {
        acc[index + 1] = curr.trim();
        return acc;
      }, {});
  
      const jobDescription = {
        1: values.job_description.trim()
      };
  
      const payload = {
        ...values,
        min_qualification: minQualifications,
        perks_benefits: perksBenefits,
        required_skills: requiredSkills,
        location: location,
        job_description: jobDescription,
        recruitment_end_date: formattedDate,
        minimum_salary: values.salary_type === 'Onwards' ? null : values.minimum_salary,
        maximum_salary: values.salary_type === 'Fixed' ? null : values.maximum_salary,
        minimum_experience: values.experience_type === 'Fresher' ? null : values.minimum_experience,
      };
  
      console.log(payload);
  
      const response = await axiosInstance.post('/create-job/', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 201 || response.status === 200) {
        alert('Job posted successfully');
      }
    } catch (error) {
      alert('Failed to create job. Please try again.');
    }
    setSubmitting(false);
  };
  


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching domain list: {error.message}</p>;

  return (
    <>
      <Formik
        initialValues={{
          job_title: '',
          job_description: '',
          min_qualification: '',
          job_level: '',
          working_mode: '',
          preference: '',
          perks_benefits: '',
          salary_type: '',
          minimum_salary: '',
          maximum_salary: '',
          job_category: '',
          experience_type: '',
          minimum_experience: '',
          educational_qualification: '',
          reference_website: '',
          no_of_vacancies: '',
          required_skills: '',
          location: '',
          recruitment_end_date: new Date(),
          domain: '',
        }}
        validationSchema={jobSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form>
            <Group justify='space-between'>
              <Title order={3}>Post a New Job</Title>

            </Group>

            <Card radius={"md"} mt={10}>
              <Input.Wrapper label="Job Title" error={touched.job_title && errors.job_title}>
                <Input
                  name="job_title"
                  value={values.job_title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder=""
                />
              </Input.Wrapper>

              <Textarea
                mt={10}
                label="Job Description"
                autosize
                minRows={5}
                name="job_description"
                value={values.job_description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="In this dynamic role, you will be responsible for [brief, attention-grabbing description of 2-3 key responsibilities]. You will play a crucial part in [explain how this role contributes to the team/company's success]."
                error={touched.job_description && errors.job_description}
              />

              <Textarea
                mt={10}
                label="Minimum Qualification"
                autosize
                minRows={2}
                name="min_qualification"
                value={values.min_qualification}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter comma separated values"
                error={touched.min_qualification && errors.min_qualification}
              />

              <Input.Wrapper mt={10} label="Domain" error={touched.domain && errors.domain}>
                <Select
                  data={domainList.map(domain => ({
                    value: String(domain.id), // Convert id to string explicitly
                    label: domain.domain_name
                  }))}
                  value={values.domain}
                  onChange={(value) => setFieldValue('domain', value)}
                  placeholder="Select Domain"
                />
              </Input.Wrapper>


              <SimpleGrid
                mt={10}
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
              >
                <Input.Wrapper label="Job Level" error={touched.job_level && errors.job_level}>
                  <Select
                    data={JOB_LEVEL}
                    value={values.job_level}
                    onChange={(value) => setFieldValue('job_level', value)}
                    placeholder="Select job level"
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Working Mode" error={touched.working_mode && errors.working_mode}>
                  <Select
                    data={WORK_MODE}
                    value={values.working_mode}
                    onChange={(value) => setFieldValue('working_mode', value)}
                    placeholder="Select working mode"
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Working Preference" error={touched.preference && errors.preference}>
                  <Select
                    data={JOB_PREFERENCE}
                    value={values.preference}
                    onChange={(value) => setFieldValue('preference', value)}
                    placeholder="Select working preference"
                  />
                </Input.Wrapper>
              </SimpleGrid>

              <Textarea
                mt={10}
                label="Perks & Benefits"
                autosize
                minRows={2}
                name="perks_benefits"
                value={values.perks_benefits}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=""
                error={touched.perks_benefits && errors.perks_benefits}
              />
            </Card>

            <Card radius={"md"} mt={20}>
              <SimpleGrid
                mt={10}
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'md' }}
              >
                <Input.Wrapper label="Salary Type" error={touched.salary_type && errors.salary_type}>
                  <Select
                    data={SALARY_TYPE}
                    value={values.salary_type}
                    onChange={(value) => setFieldValue('salary_type', value)}
                    placeholder="Select salary type"
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Minimum Salary" error={touched.minimum_salary && errors.minimum_salary}>
                  <Input
                    type="number"
                    name="minimum_salary"
                    value={values.minimum_salary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                    disabled={values.salary_type === 'Onwards'}
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Maximum Salary" error={touched.maximum_salary && errors.maximum_salary}>
                  <Input
                    type="number"
                    name="maximum_salary"
                    value={values.maximum_salary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                    disabled={values.salary_type === 'Fixed'}
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Job Category" error={touched.job_category && errors.job_category}>
                  <Select
                    data={JOB_CATEGORY}
                    value={values.job_category}
                    onChange={(value) => setFieldValue('job_category', value)}
                    placeholder="Select job category"
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Experience Type" error={touched.experience_type && errors.experience_type}>
                  <Select
                    data={EXPERIENCE_TYPE}
                    value={values.experience_type}
                    onChange={(value) => setFieldValue('experience_type', value)}
                    placeholder="Select experience type"
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Minimum Experience" error={touched.minimum_experience && errors.minimum_experience}>
                  <Input
                    type="number"
                    name="minimum_experience"
                    value={values.minimum_experience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                    disabled={values.experience_type === 'Fresher'}
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Educational Qualification" error={touched.educational_qualification && errors.educational_qualification}>
                  <Select
                    data={EDUCATIONAL_QUALIFICATION}
                    value={values.educational_qualification}
                    onChange={(value) => setFieldValue('educational_qualification', value)}
                    placeholder="Select educational qualification"
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Reference Website" error={touched.reference_website && errors.reference_website}>
                  <Input
                    name="reference_website"
                    value={values.reference_website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Number of Vacancies" error={touched.no_of_vacancies && errors.no_of_vacancies}>
                  <Input
                    type="number"
                    name="no_of_vacancies"
                    value={values.no_of_vacancies}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                  />
                </Input.Wrapper>
              </SimpleGrid>

              <SimpleGrid
                mt={10}
                cols={{ base: 1, sm: 2, lg: 2 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
              >
                <Input.Wrapper label="Job Location" error={touched.location && errors.location}>
                  <Input
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                  />
                </Input.Wrapper>

                <DateInput
                  valueFormat="DD/MM/YYYY"
                  label="Recruitment End Date"
                  placeholder="Recruitment End Date"
                  value={values.recruitment_end_date}
                  onChange={(date) => setFieldValue('recruitment_end_date', date)}
                  error={touched.recruitment_end_date && errors.recruitment_end_date}
                  onBlur={handleBlur}
                />
              </SimpleGrid>

              <Input.Wrapper mt={10} description="Enter comma separated values" label="Required Skills" error={touched.required_skills && errors.required_skills}>
                <Input
                  name="required_skills"
                  value={values.required_skills}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder=""
                />
              </Input.Wrapper>
            </Card>

            <Group my={20} justify='end' >
              <Button
                color='green'
                size='xs'
                leftSection={<IconSquareRoundedCheck size={14} />}
                type="submit"
                disabled={isSubmitting}
              >
                Publish
              </Button>
            </Group>

          </Form>
        )}
      </Formik>
    </>
  );
};
