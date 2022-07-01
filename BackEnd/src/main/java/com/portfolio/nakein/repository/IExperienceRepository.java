package com.portfolio.nakein.repository;

import com.portfolio.nakein.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IExperienceRepository extends JpaRepository<Experience,Long>{
    
}
