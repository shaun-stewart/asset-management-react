import {useCallback, useState} from "react"

export const useAnswerFormData = initial => {

  const [materialId, setMaterialId] = useState(initial.material_id && initial.material_id.toString())
  const [conditionId, setConditionId] = useState(initial.condition_id && initial.condition_id.toString())
  const [buildPhaseId, setBuildPhaseId] = useState(initial.buildphase_id && initial.buildphase_id.toString())
  const [responsibilityId, setResponsibilityId] = useState(initial.responsibility_id && initial.responsibility_id.toString())
  const [comments, setComments] = useState("")
  const [renewals, setRenewals] = useState({})

  return {
    materialId, setMaterialId,
    conditionId, setConditionId,
    buildPhaseId, setBuildPhaseId,
    responsibilityId, setResponsibilityId,
    comments, setComments,
    renewals, setRenewals
  }
}