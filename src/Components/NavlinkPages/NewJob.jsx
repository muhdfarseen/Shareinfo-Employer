import React, { useState } from 'react';
import { Title, Input, Card, Textarea, SimpleGrid, Button, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconSquareRoundedCheck } from '@tabler/icons-react';
import axiosInstance from "../../Helpers/axios";

export const NewJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [workingMode, setWorkingMode] = useState('');
  const [preference, setPreference] = useState('');
  const [perksBenefits, setPerksBenefits] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [experienceType, setExperienceType] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [educationalQualification, setEducationalQualification] = useState('');
  const [referenceWebsite, setReferenceWebsite] = useState('');
  const [numVacancies, setNumVacancies] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [recruitmentStartDate, setRecruitmentStartDate] = useState(null);
  const [recruitmentEndDate, setRecruitmentEndDate] = useState(null);

  const handlePublish = async () => {
    const jobData = {
      job_title: jobTitle,
      salary_type: salaryType,
      minimum_salary: minSalary,
      maximum_salary: maxSalary,
      working_mode: workingMode,
      preference: preference,
      job_description: jobDescription,
      min_qualification: educationalQualification,
      perks_benefits: perksBenefits,
      required_skills: requiredSkills,
      educational_qualification: educationalQualification,
      job_level: jobLevel,
      job_category: jobCategory,
      experience_type: experienceType,
      minimum_experience: minExperience,
      no_of_vacancies: numVacancies,
      reference_website: referenceWebsite,
      recruitment_start_date: recruitmentStartDate ? recruitmentStartDate.toISOString().split('T')[0] : null,
      recruitment_end_date: recruitmentEndDate ? recruitmentEndDate.toISOString().split('T')[0] : null,
      location: jobLocation,
    };

    try {
      const response = await axiosInstance.post('/create-job/', jobData);
      if (response.status === 201) {
        // Handle successful job creation
        console.log('Job created successfully');
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <>
      <Group justify='space-between'>
        <Title order={3}>Post a New Job</Title>
        <Button color='green' size='xs' leftSection={<IconSquareRoundedCheck size={14} />} onClick={handlePublish}>
          Publish
        </Button>
      </Group>

      <Card radius={"md"} mt={10}>
        <Input.Wrapper label="Job Title">
          <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="" />
        </Input.Wrapper>

        <Textarea
          mt={10}
          label="Job Description"
          autosize
          minRows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="In this dynamic role, you will be responsible for [brief, attention-grabbing description of 2-3 key responsibilities]. You will play a crucial part in [explain how this role contributes to the team/company's success]."
        />

        <SimpleGrid
          mt={10}
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <Input.Wrapper label="Job Level">
            <Input value={jobLevel} onChange={(e) => setJobLevel(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Working Mode">
            <Input value={workingMode} onChange={(e) => setWorkingMode(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Working Preference">
            <Input value={preference} onChange={(e) => setPreference(e.target.value)} placeholder="" />
          </Input.Wrapper>
        </SimpleGrid>

        <Textarea
          mt={10}
          label="Perks & Benefits"
          autosize
          minRows={2}
          value={perksBenefits}
          onChange={(e) => setPerksBenefits(e.target.value)}
        />
      </Card>

      <Card radius={"md"} mt={20}>
        <SimpleGrid
          mt={10}
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'md' }}
        >
          <Input.Wrapper label="Salary Type">
            <Input value={salaryType} onChange={(e) => setSalaryType(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Minimum Salary">
            <Input value={minSalary} onChange={(e) => setMinSalary(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Maximum Salary">
            <Input value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Job Category">
            <Input value={jobCategory} onChange={(e) => setJobCategory(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Experience Type">
            <Input value={experienceType} onChange={(e) => setExperienceType(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Minimum Experience">
            <Input value={minExperience} onChange={(e) => setMinExperience(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Educational Qualification">
            <Input value={educationalQualification} onChange={(e) => setEducationalQualification(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Reference Website">
            <Input value={referenceWebsite} onChange={(e) => setReferenceWebsite(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <Input.Wrapper label="Number of Vacancies">
            <Input value={numVacancies} onChange={(e) => setNumVacancies(e.target.value)} placeholder="" />
          </Input.Wrapper>
        </SimpleGrid>

        <Input.Wrapper mt={10} label="Required Skills">
          <Input value={requiredSkills} onChange={(e) => setRequiredSkills(e.target.value)} placeholder="" />
        </Input.Wrapper>

        <SimpleGrid
          mt={10}
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <Input.Wrapper label="Job Location">
            <Input value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} placeholder="" />
          </Input.Wrapper>
          <DateInput
            value={recruitmentStartDate}
            onChange={setRecruitmentStartDate}
            valueFormat="DD/MM/YYYY"
            label="Recruitment Start Date"
            placeholder="Recruitment Start Date"
          />
          <DateInput
            value={recruitmentEndDate}
            onChange={setRecruitmentEndDate}
            valueFormat="DD/MM/YYYY"
            label="Recruitment End Date"
            placeholder="Recruitment End Date"
          />
        </SimpleGrid>
      </Card>
    </>
  );
};
