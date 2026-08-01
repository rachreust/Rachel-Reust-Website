document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#briefFilterForm");
    const generateButton = document.querySelector("#generateBrief");
  
    if (!form || !generateButton) {
      console.error(
        "Recruiter Brief: #briefFilterForm or #generateBrief was not found."
      );
      return;
    }
  
    const caseStudies = [
      {
        id: "supervisor",
        title: "Supervisor Case Management Portal",
        url: "supervisor-case-management-portal.html",
  
        description:
          "A strong match for complex operational workflows, internal systems, stakeholder requirements, and cross-functional product execution.",
  
        reason:
          "This case study demonstrates workflow architecture, role-based permissions, supervisor decision-making, stakeholder collaboration, and the translation of complex operational requirements into a scalable interface.",
  
        summary:
          "Rachel combines systems thinking, workflow design, and stakeholder alignment to create operational products that make complex work easier to understand and complete.",
  
        tags: [
          "B2B SaaS",
          "Complex Workflows",
          "Systems Thinking",
          "Stakeholder Alignment"
        ],
  
        scores: {
          product: {
            b2b: 96,
            internalTools: 100,
            mobile: 42
          },
  
          role: {
            productThinking: 94,
            workflowSystems: 100,
            interactionDesign: 84,
            interfaceDesign: 87,
            researchSynthesis: 82,
            prototyping: 88,
            collaboration: 98
          },
  
          experience: {
            developing: 72,
            strong: 96,
            advanced: 90
          },
  
          strength: {
            communication: 94,
            userEmpathy: 86,
            stakeholderAlignment: 100,
            adaptability: 91,
            teamCollaboration: 98,
            fastPacedDelivery: 85
          }
        }
      },
  
      {
        id: "mobile",
        title: "Mobile Case Management App",
        url: "mobile-app.html",
  
        description:
          "A strong match for mobile interaction design, field research, rapid prototyping, and designing around real-world user constraints.",
  
        reason:
          "This case study demonstrates mobile-first workflow design, research synthesis, talk-to-text documentation, information architecture, prototyping, and iterative validation with case managers.",
  
        summary:
          "Rachel translates field research and user constraints into focused mobile workflows that reduce administrative friction and support work in the moment.",
  
        tags: [
          "Mobile UX",
          "User Research",
          "Rapid Prototyping",
          "Field Workflows"
        ],
  
        scores: {
          product: {
            b2b: 86,
            internalTools: 84,
            mobile: 100
          },
  
          role: {
            productThinking: 87,
            workflowSystems: 91,
            interactionDesign: 100,
            interfaceDesign: 93,
            researchSynthesis: 98,
            prototyping: 100,
            collaboration: 91
          },
  
          experience: {
            developing: 82,
            strong: 96,
            advanced: 84
          },
  
          strength: {
            communication: 90,
            userEmpathy: 100,
            stakeholderAlignment: 88,
            adaptability: 98,
            teamCollaboration: 92,
            fastPacedDelivery: 97
          }
        }
      },
  
      {
        id: "admin",
        title: "Admin Reporting Dashboard",
        url: "admin-panel-case-study.html",
  
        description:
          "A strong match for data-rich interface design, executive reporting, information hierarchy, and strategic decision support.",
  
        reason:
          "This case study demonstrates dashboard strategy, KPI prioritization, accessible data visualization, executive stakeholder alignment, and the transformation of dense reporting data into clear decision support.",
  
        summary:
          "Rachel brings structure and visual clarity to data-heavy products, helping leadership teams understand performance, funding, outcomes, and operational health.",
  
        tags: [
          "Dashboard UX",
          "Data Visualization",
          "Product Strategy",
          "Executive Users"
        ],
  
        scores: {
          product: {
            b2b: 97,
            internalTools: 100,
            mobile: 34
          },
  
          role: {
            productThinking: 95,
            workflowSystems: 89,
            interactionDesign: 79,
            interfaceDesign: 100,
            researchSynthesis: 84,
            prototyping: 86,
            collaboration: 92
          },
  
          experience: {
            developing: 70,
            strong: 94,
            advanced: 98
          },
  
          strength: {
            communication: 92,
            userEmpathy: 80,
            stakeholderAlignment: 98,
            adaptability: 88,
            teamCollaboration: 90,
            fastPacedDelivery: 84
          }
        }
      }
    ];
  
    const labels = {
      product: {
        b2b: "B2B / SaaS",
        internalTools: "Internal Tools",
        mobile: "Mobile Products"
      },
  
      experienceLevel: {
        developing: "Developing",
        strong: "Strong IC",
        advanced: "Advanced / Strategic"
      },
  
      role: {
        productThinking: "Product Thinking",
        workflowSystems: "Workflow & Systems",
        interactionDesign: "Interaction Design",
        interfaceDesign: "Interface Design",
        researchSynthesis: "Research & Synthesis",
        prototyping: "Prototyping",
        collaboration: "Collaboration"
      },
  
      strength: {
        communication: "Communication",
        userEmpathy: "User Empathy",
        stakeholderAlignment: "Stakeholder Alignment",
        adaptability: "Adaptability",
        teamCollaboration: "Team Collaboration",
        fastPacedDelivery: "Fast-Paced Delivery"
      }
    };
  
    const caseStudyLabels = {
      supervisor: "Supervisor Portal",
      mobile: "Mobile App",
      admin: "Admin Dashboard"
    };
  
    const dimensionLabels = {
      product: "product match",
      role: "role-priority match",
      experience: "experience match",
      skills: "skills match"
    };
  
    setupDropdowns();
    enforceCheckboxLimit("role", 3);
    enforceCheckboxLimit("strength", 3);
  
    generateButton.addEventListener("click", buildReport);
  
    function setupDropdowns() {
      const dropdowns = Array.from(
        form.querySelectorAll(".briefDropdown")
      );
  
      dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("toggle", () => {
          if (!dropdown.open) {
            return;
          }
  
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.open = false;
            }
          });
        });
      });
  
      form
        .querySelectorAll('.briefDropdown input[type="radio"]')
        .forEach((input) => {
          input.addEventListener("change", () => {
            input.closest("details")?.removeAttribute("open");
          });
        });
  
      document.addEventListener("click", (event) => {
        if (!form.contains(event.target)) {
          closeDropdowns();
        }
      });
    }
  
    function enforceCheckboxLimit(name, limit) {
      const checkboxes = Array.from(
        form.querySelectorAll(
          `input[type="checkbox"][name="${name}"]`
        )
      );
  
      function updateDisabledState() {
        const checked = checkboxes.filter(
          (checkbox) => checkbox.checked
        );
  
        checkboxes.forEach((checkbox) => {
          checkbox.disabled =
            !checkbox.checked && checked.length >= limit;
        });
      }
  
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener(
          "change",
          updateDisabledState
        );
      });
  
      updateDisabledState();
    }
  
    function buildReport() {
      const selections = {
        product: getSelectedRadio("product"),
        experience: getSelectedRadio("experienceLevel"),
        roles: getSelectedCheckboxes("role"),
        strengths: getSelectedCheckboxes("strength")
      };
  
      const missingSelections = [];
  
      if (!selections.product) {
        missingSelections.push("Product");
      }
  
      if (!selections.roles.length) {
        missingSelections.push("Role");
      }
  
      if (!selections.experience) {
        missingSelections.push("Experience Level");
      }
  
      if (!selections.strengths.length) {
        missingSelections.push("Skills");
      }
  
      if (missingSelections.length) {
        showValidationMessage(missingSelections);
        return;
      }
  
      const results = caseStudies
        .map((caseStudy) => {
          const matches = {
            product:
              caseStudy.scores.product[
                selections.product
              ] ?? 0,
  
            role: average(
              selections.roles.map(
                (role) =>
                  caseStudy.scores.role[role] ?? 0
              )
            ),
  
            experience:
              caseStudy.scores.experience[
                selections.experience
              ] ?? 0,
  
            skills: average(
              selections.strengths.map(
                (strength) =>
                  caseStudy.scores.strength[
                    strength
                  ] ?? 0
              )
            )
          };
  
          const total =
            matches.product * 0.25 +
            matches.role * 0.4 +
            matches.experience * 0.2 +
            matches.skills * 0.15;
  
          return {
            ...caseStudy,
            matches,
            total
          };
        })
        .sort((first, second) => {
          return (
            second.total - first.total ||
            second.matches.role -
              first.matches.role ||
            second.matches.product -
              first.matches.product
          );
        });
  
      const recommendation = results[0];
  
      updateChart(results);
      updateSummary(recommendation, selections);
      updateSkillMix(recommendation, selections);
      updateRecommendation(recommendation);
  
      document
        .querySelector("#briefResults")
        ?.classList.add("has-results");
  
      closeDropdowns();
    }
  
    function getSelectedRadio(name) {
      return (
        form.querySelector(
          `input[name="${name}"]:checked`
        )?.value ?? null
      );
    }
  
    function getSelectedCheckboxes(name) {
      return Array.from(
        form.querySelectorAll(
          `input[name="${name}"]:checked`
        )
      ).map((input) => input.value);
    }
  
    function average(values) {
      if (!values.length) {
        return 0;
      }
  
      const total = values.reduce(
        (sum, value) => sum + value,
        0
      );
  
      return total / values.length;
    }
  
    function updateChart(results) {
      results.forEach((result) => {
        Object.entries(result.matches).forEach(
          ([dimension, score]) => {
            updateChartBar(
              result.id,
              dimension,
              score
            );
          }
        );
      });
  
      const emptyMessage =
        document.querySelector("#briefChartEmpty");
  
      if (emptyMessage) {
        emptyMessage.hidden = true;
      }
    }
  
    function updateChartBar(caseStudyId, dimension, score) {
      const bar = document.querySelector(
        `#bar-${caseStudyId}-${dimension}`
      );
    
      if (!bar) {
        console.warn(
          `Chart bar not found: #bar-${caseStudyId}-${dimension}`
        );
        return;
      }
    
      const roundedScore = Math.round(score);
    
      // Set the actual percentage height directly.
      bar.style.height = `${roundedScore}%`;
    
      bar.setAttribute(
        "aria-valuenow",
        String(roundedScore)
      );
    
      bar.setAttribute(
        "aria-label",
        `${caseStudyLabels[caseStudyId]} ${
          dimensionLabels[dimension]
        }: ${roundedScore}%`
      );
    
      bar.title = `${roundedScore}%`;
    }
  
    function updateSummary(
      recommendation,
      selections
    ) {
      const summary = document.querySelector(
        "#reportSummary"
      );
  
      const title = document.querySelector(
        "#briefSummaryTitle"
      );
  
      const copy = document.querySelector(
        "#briefSummaryCopy"
      );
  
      const primaryRoles = selections.roles
        .slice(0, 2)
        .map((role) => labels.role[role])
        .join(" + ");
  
      title.textContent =
        `${labels.product[selections.product]} · ` +
        `${labels.experienceLevel[selections.experience]} · ` +
        primaryRoles;
  
      copy.textContent =
        `${recommendation.summary} ` +
        `The strongest portfolio match is the ` +
        `${recommendation.title}.`;
  
      summary?.classList.remove("is-empty");
    }
  
    function updateSkillMix(
      recommendation,
      selections
    ) {
      const rankedSkills = selections.strengths
        .map((strength) => {
          return {
            key: strength,
            label: labels.strength[strength],
            score:
              recommendation.scores.strength[
                strength
              ] ?? 0
          };
        })
        .sort(
          (first, second) =>
            second.score - first.score
        )
        .slice(0, 3);
  
      const totalScore = rankedSkills.reduce(
        (sum, skill) => sum + skill.score,
        0
      );
  
      const segments = [
        document.querySelector("#skillSegment1"),
        document.querySelector("#skillSegment2"),
        document.querySelector("#skillSegment3")
      ];
  
      segments.forEach((segment, index) => {
        if (!segment) {
          return;
        }
  
        const skill = rankedSkills[index];
  
        if (!skill || totalScore === 0) {
          segment.style.width = "0%";
          segment.title = "";
          return;
        }
  
        const percentage =
          (skill.score / totalScore) * 100;
  
        segment.style.width = `${percentage}%`;
        segment.title =
          `${skill.label}: ${Math.round(
            percentage
          )}% of selected emphasis`;
      });
  
      const legend = document.querySelector(
        "#skillLegend"
      );
  
      if (!legend) {
        return;
      }
  
      const legendItems = rankedSkills.map(
        (skill, index) => {
          const percentage =
            totalScore > 0
              ? Math.round(
                  (skill.score / totalScore) * 100
                )
              : 0;
  
          const item = document.createElement("span");
          item.className = "briefSkillLegendItem";
  
          const dot = document.createElement("i");
          dot.className =
            `briefSkillLegendDot ` +
            `briefSkillLegendDot--${index + 1}`;
  
          const text = document.createElement("span");
          text.textContent =
            `${skill.label} ${percentage}%`;
  
          item.append(dot, text);
  
          return item;
        }
      );
  
      legend.replaceChildren(...legendItems);
    }
  
    function updateRecommendation(recommendation) {
      const card = document.querySelector(
        "#recommendationCard"
      );
  
      const title = document.querySelector(
        "#recommendationTitle"
      );
  
      const description = document.querySelector(
        "#recommendationDescription"
      );
  
      const reason = document.querySelector(
        "#recommendationReason"
      );
  
      const tags = document.querySelector(
        "#recommendationTags"
      );
  
      const link = document.querySelector(
        "#recommendationLink"
      );
  
      title.textContent = recommendation.title;
      description.textContent =
        recommendation.description;
      reason.textContent = recommendation.reason;
  
      const tagElements = recommendation.tags.map(
        (tagText) => {
          const tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = tagText;
          return tag;
        }
      );
  
      tags.replaceChildren(...tagElements);
  
      link.href = recommendation.url;
      link.hidden = false;
  
      card?.classList.remove("is-empty");
    }
  
    function showValidationMessage(missingSelections) {
      const title = document.querySelector(
        "#briefSummaryTitle"
      );
  
      const copy = document.querySelector(
        "#briefSummaryCopy"
      );
  
      title.textContent = "Complete your brief";
  
      copy.textContent =
        `Choose at least one option for: ` +
        `${missingSelections.join(", ")}.`;
  
      document
        .querySelector("#reportSummary")
        ?.classList.remove("is-empty");
    }
  
    function closeDropdowns() {
      form
        .querySelectorAll(".briefDropdown[open]")
        .forEach((dropdown) => {
          dropdown.open = false;
        });
    }
  });